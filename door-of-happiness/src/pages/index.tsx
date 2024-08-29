import { useState } from "react";
import Porta from "../../components/Porta";
import PortaModel from "../../model/portaModel";
import { alterarPorta, criarPortas } from "../../functions/portas";

export default function Home() {
  const [portas, setPortas] = useState(criarPortas(3, 2));

  const renderizarPortas = () => {
    return portas.map((porta) => {
      return (
        <Porta
          key={porta.numero}
          value={porta}
          onChange={(novaPorta) => {
            setPortas(alterarPorta(portas, novaPorta));
          }}
        />
      );
    });
  };
  return <div style={{ display: "flex" }}>{renderizarPortas()}</div>;
}
