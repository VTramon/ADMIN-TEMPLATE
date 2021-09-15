import Head from "next/head";
import loadingImage from "../../../public/images/loading.gif";
import Image from "next/image";
import useAuth from "../../data/hook/useAuth";
import router from "next/router";

export default function ForcarAutenticacao(props) {
  const { user, loading } = useAuth();

  function renderizarConteudo() {
    return (
      <>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                    if(!document.cookie?.includes('admin-template-cod3r-auth')) {
                        window.location.href = "/autenticacao"
                    }
                `,
            }}
          />
        </Head>
        {props.children}
      </>
    );
  }

  function renderizarCarregando() {
    return (
      <div
        className={`
                flex justify-center items-center h-screen
            `}
      >
        <Image src={loadingImage} alt="imagem de loading" />
      </div>
    );
  }
  if (!loading && user?.email) {
    return renderizarConteudo();
  } else if (loading) {
    return renderizarCarregando();
  } else {
    router.push("/autenticacao");
    return null;
  }
}
