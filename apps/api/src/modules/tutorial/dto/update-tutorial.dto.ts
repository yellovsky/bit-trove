// global modules
import type { CMSTutorial } from '@repo/api-models';

// common modules
import { UpdateCMSArticleDTO } from 'src/modules/article';

export class UpdateCMSTutorialDTO
  extends UpdateCMSArticleDTO
  implements CMSTutorial {}
