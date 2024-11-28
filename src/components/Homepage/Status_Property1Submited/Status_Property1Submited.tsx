import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import classes from './Status_Property1Submited.module.css';

interface Props {
  className?: string;
}
/* @figmaId 1:24 */
export const Status_Property1Submited: FC<Props> = memo(function Status_Property1Submited(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.submited}>Submited</div>
    </div>
  );
});
