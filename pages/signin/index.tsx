import { signIn, signOut, useSession } from "next-auth/react";

export default () => {
  const { data } = useSession();
  return (
    <div>
      <button onClick={() => signIn("github")}>使用 Github 登录</button>
      <button onClick={() => signOut()}>登出</button>
      {data ? (
        <div>
          <li>{data.user?.name}</li>
          <li>{data.user?.email}</li>
          <img src={data.user?.image || ""} />
        </div>
      ) : (
        <div>未登录</div>
      )}
    </div>
  );
};
