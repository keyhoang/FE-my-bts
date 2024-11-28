import React, {memo, useEffect, useState} from 'react';
import type { FC } from 'react';

import resets from '../_resets.module.css';
import { Frame1000014350Icon } from './Frame1000014350Icon';
import { FrameIcon } from './FrameIcon';
import { FrameIcon2 } from './FrameIcon2';
import classes from './Homepage.module.css';
import { VuesaxLinearFilter } from './VuesaxLinearFilter/VuesaxLinearFilter';
import { VuesaxLinearSearchNormalIcon } from './VuesaxLinearSearchNormalIcon';
import {SearchTicket} from "../../model/searchTicket";
import {search} from "../../services/api";
import Card from "../Homepage/card/card";

interface Props {
  className?: string;
}

/* @figmaId 1:186 */
export const Homepage: FC<Props> = memo(function Homepage(props = {}) {
  const [data, setData] = useState<SearchTicket[]>([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  // Load data from the API
  const loadData = async (query = "") => {
    setLoading(true);
    try {
      const response = await search(query);
      setData(response || []); // Ensure response is set or fallback to an empty array
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    loadData(searchText);
  };

  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.frame}>
        <div className={classes.frame1000014350}>
          <Frame1000014350Icon className={classes.icon} />
        </div>
        <div className={classes.frame1000014349}>
          <div className={classes.frame2}>
            <FrameIcon className={classes.icon2} />
          </div>
        </div>
      </div>
      <div className={classes.frame1000014171}>
        <div className={classes.frame1000014170}>
          <div className={classes.btn}>
            <div className={classes.frame1000014168}>
              <div className={classes.frame1000014167}>
                <div className={classes.group3}>
                  <div className={classes.frame3}>
                    <FrameIcon2 className={classes.icon3} />
                  </div>
                </div>
              </div>
              <div className={classes.export}>Export </div>
            </div>
          </div>
          <div className={classes.frame1000014331}>
            <div className={classes.search}>
              <div className={classes.vuesaxLinearSearchNormal}>
                <VuesaxLinearSearchNormalIcon className={classes.icon4} />
              </div>
              <div className={classes.frame1000014330}>
                <div className={classes.search2}>Search</div>
              </div>
            </div>
            <div className={classes.frame1000014333}>
              <VuesaxLinearFilter className={classes.vuesaxLinearFilter} />
            </div>
          </div>
        </div>
        <div className={classes.frame1000014191}>
          {data && data.length > 0 ? (
              data.map((item, index) => <Card key={index} item={item} />)
          ) : (
              <p className="text-center">No data available.</p>
          )}
        </div>
      </div>
    </div>
  );
});
