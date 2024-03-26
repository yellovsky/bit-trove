// global modules
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@bit-trove/localization/link';

// local modules
import {
  text as textCn,
  button as buttonCn,
  text404 as text404Cn,
  imgHolder as imgHolderCn,
  textHolder as textHolderCn,
  notfoundHolder as notfoundHolderCn,
} from './not-found.module.scss';

export default async function NotFound() {
  const t = await getTranslations();

  return (
    <div className={notfoundHolderCn}>
      <div className={imgHolderCn}>
        <Image aria-hidden alt="astrinaut" src="/assets/astronaut.svg" width={200} height={200} />
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
