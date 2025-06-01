import NoteAlbum from "../NoteAlbum/NoteAlbum";
import { useState, useEffect } from "react";
import data from "./NoteAlbumListExample.json";
import exampleJPEG from "../../assets/forLibrary/example.jpeg";
import examplePDF from "../../assets/forLibrary/example.pdf"
import { Link } from "react-router-dom";
import styles from "./NoteAlbumList.module.css"

const exampleMAP = {
    'example.jpeg': exampleJPEG,
    'example.pdf': examplePDF
}

function NoteAlbumList({ props }) {
    const [noteAlbums] = useState(data)

    return (
        <>
            <div>
                <div className={styles.captionContainer}>
                    <h2 className={styles.h2}>Подборки произведений и композиций</h2>
                    <p className={styles.caption}>Самые востребованные музыкальные произведения, собранные по интересам и тематикам.</p>
                </div>

                <ul className={styles.list}>
                    {noteAlbums.map((album) => (
                        <li className={styles.listElement} key={album.id}>
                            <Link to='librarySelected' state={{ album }}>
                                <NoteAlbum album={album} name={album.name} image={exampleMAP[album.image]} />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default NoteAlbumList