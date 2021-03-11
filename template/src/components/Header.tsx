import React from "react";
import { Divider, /*Input,*/ Button, Tooltip, Tag } from "@geist-ui/react";
import "../css/index.css";

export default function Header() {
  return (
    <div>
      <div className="info">
        <div className="details">
          <h4>dir2html</h4>
          <small>1479 files in 138 folders (22.3 MB)</small>
          <small>Created 2017-04-18 20:48</small>
        </div>
        <div className="search">
          {/* <Input placeholder="Search files and folders" /> */}

          <Tooltip
            text={
              <>
                Search files
                <br />
                <div className="text-center">
                  <Tag type="lite" className="m1">
                    Ctrl
                  </Tag>
                  <Tag type="lite">g</Tag>
                </div>
              </>
            }
            placement="bottom"
          >
            <Button shadow type="abort">
              Search files and folders
            </Button>
          </Tooltip>
        </div>
      </div>
      <Divider></Divider>
    </div>
  );
}
