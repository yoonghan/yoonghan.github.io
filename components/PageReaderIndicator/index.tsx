import * as React from "react";
import styles from "./PageReaderIndicator.module.css";

interface Props {
  scrollContainer: React.RefObject<HTMLDivElement>;
}

const PageReaderIndicator = ({ scrollContainer }: Props) => {
  const scrollMonitorRef = React.useRef<HTMLDivElement>(null);
  const [loadPercentage, setLoadPercentage] = React.useState(0);

  const updateScrollPercentage = (evt: Event) => {
    const target = evt.target as HTMLDivElement;
    const _pos = target.scrollTop;
    const _posHeight = target.scrollHeight - target.offsetHeight;
    const _calc = (_pos / _posHeight) * 100;
    const percentage = Math.floor(_calc);
    setLoadPercentage(percentage);
    if (scrollMonitorRef.current !== null)
      scrollMonitorRef.current.style.width = `${percentage}%`;
  };

  const loadInText = () => {
    if (loadPercentage < 40) {
      return "has more";
    }
    if (loadPercentage < 70) {
      return "half way";
    }
    if (loadPercentage < 90) {
      return "almost";
    }
    return "done";
  };

  React.useEffect(() => {
    if (scrollContainer.current !== null) {
      scrollContainer.current.addEventListener(
        "scroll",
        updateScrollPercentage,
        { passive: true }
      );
    }
  }, [scrollContainer]);

  return (
    <div
      className={styles.scrollPercentage}
      ref={scrollMonitorRef}
      data-testid="scroll-container"
    >
      <div className={styles.indicator}>
        <div data-testid="scroll-status">{loadInText()}</div>
      </div>
    </div>
  );
};

export default PageReaderIndicator;
