import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import classes from './Status_Property1ApprovePrice.module.css';

interface Props {
  className?: string;
}
/* @figmaId 1:30 */
export const Status_Property1ApprovePrice: FC<Props> = memo(function Status_Property1ApprovePrice(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.approvedPrice}>Approved Price</div>
    </div>
  );
});
