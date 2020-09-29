import * as React from 'react';

const Locker:React.SFC<any> = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(data, 'data');

  return (
    <div>
      <div>Is Ready</div>
      <div>Message</div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {"1": "2"},
  }
}

export default Locker;
