import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import classes from './Status_Property1Approved.module.css';

interface Props {
  className?: string;
}
/* @figmaId 1:26 */
export const Status_Property1Approved: FC<Props> = memo(function Status_Property1Approved(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.approved}>Approved</div>
    </div>
  );
});
