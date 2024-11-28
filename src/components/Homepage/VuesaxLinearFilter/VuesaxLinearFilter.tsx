import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import classes from './VuesaxLinearFilter.module.css';
import { VuesaxLinearFilterIcon } from './VuesaxLinearFilterIcon';

interface Props {
  className?: string;
  classes?: {
    root?: string;
  };
}
/* @figmaId 1:8 */
export const VuesaxLinearFilter: FC<Props> = memo(function VuesaxLinearFilter(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${props.classes?.root || ''} ${props.className || ''} ${classes.root}`}>
      <div className={classes.vuesaxLinearFilter}>
        <VuesaxLinearFilterIcon className={classes.icon} />
      </div>
    </div>
  );
});
