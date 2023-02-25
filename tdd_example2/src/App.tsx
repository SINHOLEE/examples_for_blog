import React, { useEffect, useRef, useState } from 'react';

type SignUpForm = {
  email: string;
  password: string;
  'password-confirm': string;
  'agreement-for-personal-info': boolean;
  service: boolean;
  marketing: boolean;

  //
  all: {
    checked: boolean;
    indeterminate: boolean;
  };
};

const initFormData = {
  email: '',
  password: '',
  'password-confirm': '',
  'agreement-for-personal-info': false,
  service: false,
  marketing: false,
  all: {
    checked: false,
    indeterminate: false,
  },
};

type StringAction = { type: 'email' | 'password' | 'password-confirm'; value: string };
type BooleanAction = {
  type: 'service' | 'marketing' | 'agreement-for-personal-info';
  checked: boolean;
};
type IndeterminateAction = {
  type: 'all';
  value: {
    checked: boolean;
    indeterminate: boolean;
  };
};
const getIsIndeterminate = (
  booleans: Pick<SignUpForm, 'marketing' | 'service' | 'agreement-for-personal-info'>,
) => {
  return (
    !booleans.service && !booleans.marketing && !booleans['agreement-for-personal-info']
  );
};
const getIsAllChecked = (
  booleans: Pick<SignUpForm, 'marketing' | 'service' | 'agreement-for-personal-info'>,
) => {
  return (
    booleans.service && booleans.marketing && booleans['agreement-for-personal-info']
  );
};
type SignUpActions = StringAction | BooleanAction | IndeterminateAction;
const signUpReducer = (state: SignUpForm, action: SignUpActions): SignUpForm => {
  switch (action.type) {
    case 'email':
    case 'password':
    case 'password-confirm':
      return {
        ...state,
        [action.type]: action.value,
      };
    case 'marketing':
    case 'service':
    case 'agreement-for-personal-info': {
      const newBooleans = {
        marketing: state.marketing,
        service: state.service,
        'agreement-for-personal-info': state['agreement-for-personal-info'],
        [action.type]: action.checked,
      };
      return {
        ...state,
        all: {
          checked: getIsAllChecked(newBooleans),
          indeterminate: getIsIndeterminate(newBooleans),
        },
        [action.type]: action.checked,
      };
    }
    case 'all': {
      const { marketing, service } = state;
      const agreement = state['agreement-for-personal-info'];
      const allChecked = agreement && marketing && service;
      if (allChecked) {
        return {
          ...state,
          all: { checked: false, indeterminate: false },
          marketing: false,
          service: false,
          'agreement-for-personal-info': false,
        };
      }
      const allNotChecked = !agreement && !marketing && !service;
      if (allNotChecked) {
        return {
          ...state,
          all: { checked: true, indeterminate: false },
          marketing: true,
          service: true,
          'agreement-for-personal-info': true,
        };
      }
      return {
        ...state,
        all: { checked: true, indeterminate: false },
        marketing: true,
        service: true,
        'agreement-for-personal-info': true,
      };
    }
  }
};
function App() {
  const [count, setCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current && (inputRef.current.indeterminate = true);
  }, []);
  return (
    <body>
      <main className="container">
        <div className={'grid'}>
          <h1>회원가입</h1>
          <form>
            <label htmlFor={'email'}>email</label>
            <input id={'email'} type={'email'} required />
            <label htmlFor={'password'}>password</label>
            <input id={'password'} required type={'password'} />
            <label htmlFor={'password-confirm'}>password confirm</label>
            <input id={'password-confirm'} type={'password'} required />
            <div>
              <label htmlFor={'all'}>
                <input id={'all'} type={'checkbox'} checked={true} ref={inputRef} />
                전체동의
              </label>
              <hr />
              <label htmlFor={'agreement-for-personal-info'}>
                <input id={'agreement-for-personal-info'} type={'checkbox'} required />
                [필수] 개인정보수집 및 이용에 동의합니다.
              </label>
              <label htmlFor={'service'}>
                <input id={'service'} type={'checkbox'} required />
                [필수] 서비스 이용 약관에 동의합니다.
              </label>
              <label htmlFor={'marketing'}>
                <input id={'marketing'} type={'checkbox'} />
                [선택] 마케팅 활용 동의및 광고 수신에 동의합니다.
              </label>
            </div>
            <div aria-hidden style={{ paddingTop: 30 }}></div>
            <button>가입하기</button>
          </form>
        </div>
      </main>
    </body>
  );
}

export default App;
