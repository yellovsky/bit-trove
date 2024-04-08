// global modules
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@bit-trove/localization/link';

// local modules
import {
  button as buttonCn,
  imgHolder as imgHolderCn,
  notfoundHolder as notfoundHolderCn,
  text404 as text404Cn,
  text as textCn,
  textHolder as textHolderCn,
} from './not-found.module.scss';

export default async function NotFound() {
  const t = await getTranslations();

  return (
    <div className={notfoundHolderCn}>
      <div className={imgHolderCn}>
        <Image aria-hidden alt="astrinaut" height={200} src="/assets/astronaut.svg" width={200} />
      </div>

      <div className={textHolderCn}>
        <div>
          <p className={text404Cn}>{t('404 error')}</p>
          <p className={textCn}>{t('do not panic')}</p>
        </div>
        <div>
          <Link className={buttonCn} href="/">
            {t('return to safety')}
          </Link>
        </div>
      </div>
    </div>
  );
}
