import React from "react";
import {
  Divider,
  Button,
  // Tooltip,
  // Tag,
  Keyboard,
  // Link,
  useModal,
  Modal,
  Text,
} from "@geist-ui/react";
import styles from "../css/index.module.css";
import Sun from "@geist-ui/react-icons/sun";
import Moon from "@geist-ui/react-icons/moon";

// @ts-ignore
export default function Header({
  data,
  theme,
}: {
  data: any;
  theme: { toggle: any; current: string };
}) {
  const { setVisible, bindings } = useModal();
  // this opens modal when you hit ?
  window.onkeydown = (e: KeyboardEvent) => {
    if (e.key === "?") {
      setVisible(true);
    }
  };
  return (
    <div>
      <div className={styles.info}>
        <div className={styles.details}>
          <Text h4 b>
            {data ? data.root.path : "dir2html"}
          </Text>
          <small>
            {data ? data.operation.files : 0} files in{" "}
            {data ? data.operation.folders : 0} folders (
            {data ? data.operation.total_size : 0})
          </small>
          <small>Created 2017-04-18 20:48</small>
        </div>
        <div className={styles.search}>
          <Button shadow type="abort" onClick={() => setVisible(true)}>
            <span>Search files and folders</span>
            <Keyboard className={styles.ml5}>?</Keyboard>
          </Button>

          <div className={`${styles.themeIcon} ${styles.pointer}`}>
            {theme.current === "dark" ? (
              <Sun size={16} onClick={theme.toggle} />
            ) : (
              <Moon size={16} onClick={theme.toggle} />
            )}
          </div>
        </div>
      </div>
      <Divider></Divider>
      <Modal width="35rem" {...bindings}>
        <Modal.Title>My Favorites</Modal.Title>
        <Modal.Content>
          <p>This is the width I want.</p>
        </Modal.Content>
      </Modal>
    </div>
  );
}
