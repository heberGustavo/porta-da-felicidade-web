/* eslint-disable react-hooks/rules-of-hooks */
import styles from "../../../styles/Jogo.module.css";
import { useEffect, useState } from "react";
import { alterarPorta, criarPortas } from "../../../../functions/portas";
import Porta from "../../../../components/Porta";
import Link from "next/link";
import { useRouter } from "next/router";

export default function jogo() {
    const router = useRouter();

    const [valido, setValido] = useState(false);
    const [portas, setPortas] = useState([]);

    useEffect(() => {
        const quantPortas = +router.query.portas;
        const portaComPresente = +router.query.temPresente;

        const quantPortasValidas = quantPortas >= 3 && quantPortas <= 100;
        const portaComPresenteValida = portaComPresente >= 1 && portaComPresente <= quantPortas;
        
        setValido(quantPortasValidas && portaComPresenteValida);
    });

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
            { 
                valido ? renderizarPortas() :
                <h1>Valores Inválidos</h1>
            }
            </div>
            <div className={styles.botoes}>
                <Link href="/">
                    <button>Reiniciar Jogo</button>
                </Link>
            </div>
        </div>
    );
}