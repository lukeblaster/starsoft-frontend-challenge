import { Product } from '@/app/models';
import ProductCard from "../ProductCard";

import styles from './styles.module.scss';
import LoadButton from '../LoadButton';

const products: Product[] = [
    {
        id: 1,
        name: "Backpack",
        description: "Uma mochila resistente com compartimentos secretos, ideal para aventureiros que precisam carregar uma variedade de itens essenciais em suas jornadas épicas.",
        image: "https://softstar.s3.amazonaws.com/items/backpack.png",
        price: "182.00000000",
        createdAt: "2024-07-18T23:55:43.238Z"
    },
    {
        id: 2,
        name: "Boots of Ppeed",
        description: "Botas feitas de couro fino e tecido élfico, imbuidas com encantamentos mágicos que conferem velocidade sobrenatural a quem as usa, permitindo movimentos ágeis e fugas rápidas.",
        image: "https://softstar.s3.amazonaws.com/items/boots-of-speed.png",
        price: "338.00000000",
        createdAt: "2024-07-18T23:55:43.238Z"
    },
    {
        id: 3,
        name: "Curved Blade",
        description: "Uma lâmina curva, afiada como o olhar de um predador, forjada por habilidosos artesãos orientais. Ideal para ataques furtivos e cortes precisos em combate corpo a corpo.",
        image: "https://softstar.s3.amazonaws.com/items/curved-blade.png",
        price: "291.00000000",
        createdAt: "2024-07-18T23:55:43.238Z"
    },
    {
        id: 4,
        name: "Demon Dagger",
        description: "Uma adaga negra com runas ígneas incrustadas na lâmina, concedendo ao portador o poder de infligir feridas malditas que queimam a alma de seus adversários.",
        image: "https://softstar.s3.amazonaws.com/items/demon-dagger.png",
        price: "225.00000000",
        createdAt: "2024-07-18T23:55:43.238Z"
    },
    {
        id: 5,
        name: "Druid Staff",
        description: "Um cajado esculpido de madeira de carvalho antigo, entrelaçado com videiras vivas e adornado com gemas naturais. Amplifica os poderes da natureza, permitindo ao druida conjurar tempestades e curar feridas com a energia da vida.",
        image: "https://softstar.s3.amazonaws.com/items/druid-staff.png",
        price: "132.00000000",
        createdAt: "2024-07-18T23:55:43.238Z"
    },
    {
        id: 6,
        name: "Enchanted Cloak",
        description: "Um manto tecido com fios de prata e enfeitiçado com um encantamento de camuflagem. Oculta o portador nas sombras e o protege de ataques mágicos menores.",
        image: "https://softstar.s3.amazonaws.com/items/enchanted-cloak.png",
        price: "385.00000000",
        createdAt: "2024-07-18T23:55:43.238Z"
    },
    {
        id: 7,
        name: "Fire Hammer",
        description: "Um martelo pesado com cabeça de aço flamejante, capaz de infligir golpes ardentes que consomem até mesmo o aço mais resistente.",
        image: "https://softstar.s3.amazonaws.com/items/fire-hammer.png",
        price: "236.00000000",
        createdAt: "2024-07-18T23:55:43.238Z"
    },
    {
        id: 8,
        name: "Hunter Claw",
        description: "Garras afiadas como as presas de um lobo, moldadas em aço negro e aprimoradas com venenos mortais. Ideais para caçadores que preferem atacar suas presas com precisão letal.",
        image: "https://softstar.s3.amazonaws.com/items/hunter-claw.png",
        price: "223.00000000",
        createdAt: "2024-07-18T23:55:43.238Z"
    },
    // {
    //     id: 9,
    //     name: "Hunter Dagger",
    //     description: "Uma adaga de caça com cabo entalhado em ossos de presas raras, perfeita para emboscar criaturas selvagens ou inimigos desprevenidos.",
    //     image: "https://softstar.s3.amazonaws.com/items/hunter-dagger.png",
    //     price: "265.00000000",
    //     createdAt: "2024-07-18T23:55:43.238Z"
    // },
    // {
    //     id: 10,
    //     name: "Ice Sword",
    //     description: "Uma espada de cristal de gelo, esculpida nas cavernas congeladas das montanhas mais altas. Cada golpe congela o ar ao redor do alvo, transformando a batalha em um campo de gelo mortal.",
    //     image: "https://softstar.s3.amazonaws.com/items/ice-sword.png",
    //     price: "233.00000000",
    //     createdAt: "2024-07-18T23:55:43.238Z"
    // }
]

export default function ProductList() {
    return (
        <div className={styles.container}>
            <div className={styles.productListContainer}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <LoadButton />
        </div>
    );
}