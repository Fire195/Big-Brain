import { useState, useRef, useEffect } from 'react';

function addTimer (questionInf) {
  const timer = useRef();
  const [initialTime, setInitialTime] = useState(0); // 倒计
  const [startTimer, setStartTimer] = useState(false); // 倒计结束

  useEffect(() => {
    function runTime () {
      timer.current = setTimeout(() => {
        const newTime = initialTime - 1;
        setInitialTime(newTime);
      }, 1000);
    }

    if (initialTime === 0) {
      clearTimeout(timer.current);
      setStartTimer(true);
    } else {
      runTime();
    }
  }, [initialTime]);

  useEffect(() => {
    clearTimeout(timer.current);
    setInitialTime(Number(questionInf.time));
    setStartTimer(false);
  }, [questionInf.idOfQues]);

  return { initialTime, startTimer };
}

export default addTimer;
