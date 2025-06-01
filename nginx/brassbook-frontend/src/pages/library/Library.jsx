import SideMenu from "../../Componetns/sideMenu/SideMenu";
import NoteList from "../../Componetns/NoteList/NoteList";
import NoteAlbumList from "../../Componetns/NoteAlbumList/NoteAlbumList";
import styles from "./Library.module.css"

function Library(props) {

    return (
        <main className={styles.Library}>
            <SideMenu activeSection={'library'} />
            <div className={styles.content}>
                <NoteAlbumList />
                <NoteList list={null} />
            </div>
        </main>
    )
}

export default Library;