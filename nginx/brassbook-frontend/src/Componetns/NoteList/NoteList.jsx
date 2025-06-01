import NoteItem from "../NoteItem/NoteItem";
import { useState, useEffect } from "react";
import data from "./NoteListExample.json";
import styles from "./NoteList.module.css";
import exampleJPEG from "../../assets/forLibrary/example.jpeg";
import examplePDF from "../../assets/forLibrary/example.pdf";

const exampleMAP = {
    'example.jpeg': exampleJPEG,
    'example.pdf': examplePDF
}

function NoteList({ list }) {
    const [nAlphabet, setNAlphabet] = useState(0)
    const [searchQuery, setSearchQuery] = useState('')
    const [alphabetIsActive, setAlphabetIsActive] = useState(false)
    const [popularityIsActive, setPopularityIsActive] = useState(false)

    const [notes, setNotes] = useState(list || data)
    console.log(notes)
    useEffect(() => {
        if (list) {
            setNotes(list);
        }
    }, [list])
    const [noteList, setNoteList] = useState(list || data)
    useEffect(() => {
        if (list) {
            setNoteList(list);
        }
    }, [list])

    const handleSearch = (e) => {
        const value = e.target.value
        setSearchQuery(value)

        const filtered = noteList.filter(item => {
            return item.name.toLowerCase().includes(value.toLowerCase())
        })

        if (filtered.length > 0) {
            setNotes(filtered)
        }
    }

    function AlphabetFiltration(n) {
        let sortedList = [...notes];

        switch (n) {
            case 0: {
                sortedList = [...noteList]; // Reset to original order
                setAlphabetIsActive(false)
                break
            }
            case 1: {
                sortedList.sort((a, b) => a.name.localeCompare(b.name))
                setAlphabetIsActive(true)
                break
            }
            case 2: {
                sortedList.sort((a, b) => b.name.localeCompare(a.name))
                break
            }
        }
        setNotes(sortedList)
    }

    function AplhabetHandler() {
        const newValue = nAlphabet === 2 ? 0 : nAlphabet + 1;
        setNAlphabet(newValue);
        AlphabetFiltration(newValue);
    }


    return (
        <>
            <div>
                <h2 className={styles.caption}>Все композиции</h2>
                <div className={styles.searchContainer}>
                    <img src="/music_search.svg" alt="" />
                    <input className={styles.searchInput} type="text" placeholder="Найти композицию в альбоме" value={searchQuery} onChange={handleSearch} />
                </div>
                <div className={styles.filtrationContainer}>
                    <button className={alphabetIsActive ? styles.activeFiltration : styles.filtration} onClick={() => { AplhabetHandler() }}>
                        <img src={alphabetIsActive ? "/alphabetActive.svg" : "/src/assets/images/alfavit.svg"} alt="" />
                        <span>по алфавиту</span>
                    </button>
                    <button className={popularityIsActive ? styles.activeFiltration : styles.filtration}>
                        <img src={"/src/assets/images/popularity.svg"} alt="" />
                        <span>по популярности</span>
                    </button>
                </div>
                <ul className={styles.list}>
                    {notes.map((item) => (
                        <NoteItem key={item.id} item={item} itemName={item.name} author={item.author} src={exampleMAP[item.src]} image={exampleMAP[item.img]} />
                    ))}
                </ul>
            </div>
        </>
    )
}

export default NoteList