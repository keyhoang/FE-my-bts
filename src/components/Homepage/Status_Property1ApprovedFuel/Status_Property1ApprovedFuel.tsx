import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import classes from './Status_Property1ApprovedFuel.module.css';

interface Props {
  className?: string;
}
/* @figmaId 1:28 */
export const Status_Property1ApprovedFuel: FC<Props> = memo(function Status_Property1ApprovedFuel(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.approvedFuel}>Approved Fuel</div>
    </div>
  );
});
