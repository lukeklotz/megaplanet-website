import {artists} from './links.js'
import { Header } from './components.js'



export function ArtistsPage() {
    return (
      <>
        <Header />
        <div className="artist-page-list">
          {artists.map((artist, index) => (
            <a key={index} href={artist.url} class="artist" target="_blank" rel="noopener noreferrer">
              <h2>{artist.name}</h2>
            </a>
          ))}
        </div>
      </>
    );
  }