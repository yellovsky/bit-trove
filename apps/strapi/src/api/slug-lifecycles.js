const tailLocaleRegex = /((--[\w]{2})(-[\w]{2})?)$/gi;

const removeTailLocale = (slug) => slug.replace(tailLocaleRegex, '');

const addTailLocale = (slug, locale) => `${slug}--${locale}`;

export const createSlugLifecycles = (uid) => {
  const getBaseSlug = async (data) => {
    if (data.locale === 'en' && data.slug) return removeTailLocale(data.slug);

    const { localizations, ...entity } = await strapi.entityService.findOne(uid, data.id, {
      populate: ['localizations'],
    });

    if (entity.locale === 'en') return removeTailLocale(entity.slug);

    const withbaseLocale = await localizations.find((entity) => entity.locale === 'en');
    return removeTailLocale((withbaseLocale || data).slug);
  };

  const getEntityLocale = async (id, data) => {
    if (data?.locale) return data.locale;

    const withLocale = await strapi.entityService.findOne(uid, id, {
      fields: ['locale'],
    });

    return withLocale.locale;
  };

  const modifyBeforeSlug = async ({ params }) => {
    const id = params.where?.id;
    const dataWithLocale = id
      ? { ...params.data, id, locale: await getEntityLocale(id, params.data) }
      : params.data;

    const baseSlug = await getBaseSlug(dataWithLocale);
    const desiredSlug = addTailLocale(baseSlug, dataWithLocale.locale);

    params.data.slug = desiredSlug;
  };

  return {
    beforeCreate(event) {
      return modifyBeforeSlug(event);
    },

    beforeUpdate(event) {
      return modifyBeforeSlug(event);
    },

    async afterUpdate({ params }) {
      const dataWithLocale = {
        ...params.data,
        id: params.where.id,
        locale: await getEntityLocale(params.where.id, params.data),
      };

      const { localizations } = await strapi.entityService.findOne(uid, params.where.id, {
        populate: ['localizations'],
      });

      const baseSlug = await getBaseSlug(dataWithLocale);

      const withoutUpdated = localizations
        .filter((entity) => entity.locale !== dataWithLocale.locale)
        .map((entity) => {
          const desiredSlug = addTailLocale(baseSlug, entity.locale);

          return entity.slug === desiredSlug
            ? undefined
            : strapi.entityService.update(uid, entity.id, {
                data: { ...entity, slug: desiredSlug },
              });
        })
        .filter(Boolean);

      await Promise.all(withoutUpdated);
    },

    afterFindOne({ result }) {
      if (result?.slug) result.slug = removeTailLocale(result.slug);
    },

    beforeFindMany(event) {
      const locale = event.params.where['$and']?.find((part) => 'locale' in part)?.locale;
      const withSlug = event.params.where['$and']?.find((part) => 'slug' in part);

      if (locale && withSlug) {
        withSlug.slug['$eq'] = addTailLocale(withSlug.slug['$eq'], locale);
      }
    },

    afterFindMany({ result }) {
      result.forEach((entity) => {
        if (entity?.slug) entity.slug = removeTailLocale(entity.slug);
      });
    },
  };
};
