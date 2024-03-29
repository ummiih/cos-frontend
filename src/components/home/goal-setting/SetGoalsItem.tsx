'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { mockExamCount } from '@/recoil/atom';

interface Props {
  use: string; // 사용된 컴포넌트를 나타냄 ex) 목표 점수 설정, 공부량 설정, 공부 시간 설정
  ContentIcon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  //내용
  goalString: string;
  unitString: string;
  actionString: string;
  //목표 횟수 설정할 때 받는 props
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * 목표 설정을 할 수 있는 컴포넌트 입니다.
 * '자격증 선택', '매일 목표 설정 - 모의고사, 시간' 컴포넌트에 사용됩니다.
 */
const SetGoalsItem = (props: Props) => {
  let { use, ContentIcon, goalString, unitString, actionString, count, setCount } = props;
  const [downDisabled, setDownDisabled] = useState<boolean>(false);
  const [upDisabled, setUpDisabled] = useState<boolean>(false);

  /**
   * 점수가 최대 점수 이상 증가하는 것을 방지하도록
   * button 을 제어하는 함수
   */
  const UpButtonHandler = () => {
    if (count == 100) {
      setUpDisabled(true);
    } else {
      setUpDisabled(false);
    }
  };

  /**
   * 점수가 0점 이하를 방지하도록
   * button 을 제어하는 함수
   */
  const downButtonHandler = () => {
    if (count == 0) {
      setDownDisabled(true);
    } else {
      setDownDisabled(false);
    }
  };

  useEffect(() => {
    // 목표 점수 설정일 때만 upButtonHandler 사용
    if (use == 'goalScore') {
      UpButtonHandler();
      downButtonHandler();
    } else {
      downButtonHandler();
    }
  }, [count]);

  return (
    <div className="goal-setting-content">
      <div className="flex gap-x-2 items-center">
        <ContentIcon />
        <div className="text-h6">{goalString}</div>
        <div className="text-h4 font-semibold">
          {count}
          {unitString}
        </div>

        {/*count 를 증가 감소하는 button*/}
        <div className="flex flex-col gap-y-2">
          <button
            disabled={upDisabled}
            onClick={() => {
              use == 'goalStudyTime' ? setCount((count += 10)) : setCount(++count);
            }}>
            <UpIcon />
          </button>
          <button
            disabled={downDisabled}
            onClick={() => {
              use == 'goalStudyTime' ? setCount((count -= 10)) : setCount(--count);
            }}>
            <DownIcon />
          </button>
        </div>
        <div>{actionString}</div>
      </div>
    </div>
  );
};
export default SetGoalsItem;

function DownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={8} height={5} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7.5 1L4 4 .5 1" stroke="#000" strokeLinecap="round" />
    </svg>
  );
}

function UpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={8} height={5} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M.5 4L4 1l3.5 3" stroke="#000" strokeLinecap="round" />
    </svg>
  );
}
