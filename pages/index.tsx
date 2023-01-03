import { unstable_getServerSession } from "next-auth/next";
import { opts } from "./api/auth/[...nextauth]";
import type { Session } from "next-auth";
import type { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";

const Server = (props: { session: Session | null }) => {
  const { session } = props;

  const { data: clientSession } = useSession();

  return (
    <>
      <div>
        <h1>Client Side Rendering</h1>
        {clientSession ? (
          <p>
            Signed in as {clientSession.user?.name} <br />
            <a href="/api/auth/signout">Sign out</a>
          </p>
        ) : (
          <p>
            Not signed in <br />
            <a href="/api/auth/signin">Sign in</a>
          </p>
        )}
        <pre>{JSON.stringify({ clientSession }, null, 2)}</pre>
      </div>

      <div>
        <h1>Server Side Rendering</h1>
        {session ? (
          <p>
            Signed in as {session.user?.name} <br />
            <a href="/api/auth/signout">Sign out</a>
          </p>
        ) : (
          <p>
            Not signed in <br />
            <a href="/api/auth/signin">Sign in</a>
          </p>
        )}
        <pre>{JSON.stringify({ session }, null, 2)}</pre>
      </div>
    </>
  );
};

// Export the `session` prop to use sessions with Server Side Rendering
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await unstable_getServerSession(ctx.req, ctx.res, opts);

  console.log("session on server", session);

  return {
    props: {
      session,
    },
  };
};

export default Server;
