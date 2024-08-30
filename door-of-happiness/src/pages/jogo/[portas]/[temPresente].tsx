/* eslint-disable react-hooks/rules-of-hooks */
import styles from "../../../styles/Jogo.module.css";
import { useEffect, useState } from "react";
import { alterarPorta, criarPortas } from "../../../../functions/portas";
import Porta from "../../../../components/Porta";
import Link from "next/link";
import { useRouter } from "next/router";

export default function jogo() {
    const router = useRouter();
    const [portas, setPortas] = useState([]);

    useEffect(() => {
        const quantPortas = +router.query.portas;
        const portaComPresente = +router.query.temPresente;
        setPortas(criarPortas(quantPortas, portaComPresente));
    }, [router.query])

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

    return (
        <div id={styles.jogo}>
            <div className={styles.portas}>
            {renderizarPortas()}
            </div>
            <div className={styles.botoes}>
                <Link href="/">
                    <button>Reiniciar Jogo</button>
                </Link>
            </div>
        </div>
    );
}