/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import AuthInput from "../components/auth/AuthInput";
import Image from "next/image";
import { IconeAtencao, IconeLua } from "../components/icons";
import useAuth from "../data/hook/useAuth";

export default function Autenticacao() {
  const { cadastrar, login, loginGoogle } = useAuth();

  const [modo, setModo] = useState<"login" | "cadastro">("login");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);

  function exibirErro(msg, tempoEmSegundos = 5) {
    setErro(msg);
    setTimeout(() => setErro(null), tempoEmSegundos * 1000);
  }

  async function submeter() {
    try {
      if (modo === "login") {
        await login(email, senha);
      } else {
        await cadastrar(email, senha);
      }
    } catch (e) {
      exibirErro(e?.message ?? "Erro inesperado");
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="hidden md:block w-1/2 xl:w-2/3 ">
        <img
          src="https://source.unsplash.com/random"
          alt="Imagem da tela de autenticação"
          className="h-screen w-full object-cover"
        />
      </div>
      <div className="m-10 w-full md:w-1/2 xl:w-1/3">
        <h1
          className={`
        text-3xl font-bold mb-5 
        `}
        >
          {modo === "login"
            ? "Entre com a sua conta"
            : "Cadastre-se na plataforma"}
        </h1>
        {erro ? (
          <div
            className={`
          flex items-center
          bg-red-400 text-white py-3 px-5 my-2
          border border-red-700 rounded-lg
          `}
          >
            {IconeAtencao(6)}
            <span className="ml-3">{erro}</span>
          </div>
        ) : (
          false
        )}

        <AuthInput
          tipo="email"
          label="Email"
          valor={email}
          valorMudou={setEmail}
          obrigatorio
        />
        <AuthInput
          tipo="password"
          label="Senha"
          valor={senha}
          valorMudou={setSenha}
          obrigatorio
        />
        <button
          onClick={submeter}
          className={`
        w-full bg-indigo-500 hover:bg-indigo-400
        text-white rounded-lg px-4 py-3 mt-6
        `}
        >
          {modo === "login" ? "Entrar" : "Cadastrar"}
        </button>

        <hr className="my-6 border-gray-300 w-full" />

        <button
          onClick={loginGoogle}
          className={`
        w-full bg-red-500 hover:bg-red-400
        text-white rounded-lg px-4 py-3
        `}
        >
          Entrar com Google
        </button>
        {modo === "login" ? (
          <p className="mt-8">
            Novo por aqui?
            <a
              href="#"
              onClick={() => setModo("cadastro")}
              className={`
              text-blue-500 hover:text-blue-700 font-semibold pl-2
              cursor-poiter
            `}
            >
              Crie uma conta gratuitamente
            </a>
          </p>
        ) : (
          <p className="mt-8">
            Já faz parte da nossa comunidade?
            <a
              href="#"
              onClick={() => setModo("login")}
              className={`
            text-blue-500 hover:text-blue-700 font-semibold pl-2
            cursor-poiter
          `}
            >
              Entre com suas credenciais
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
