
import React from 'react'
import AButtonAlbum from 'components/atoms/Button/Album'
import albumsApi from 'sources/albums'
import {WRONG_CONNECTION_MESSAGE} from '../../utils/macros'

class PHome extends React.Component {
  constructor() {
    super()
    this.state = {
      albums: [],
      message: '',
    }
  }

  componentDidMount() {
    albumsApi.getAll()
      .then(json => this.setState({
        albums: json,
        message: '',
      }))
      .catch(() => this.setState({
        albums: [],
        message: WRONG_CONNECTION_MESSAGE
      }))
  }

  render() {
    const content = () => {
      if (this.state.message !== '') {
        return <div className='a-message f-page'>{this.state.message}</div>
      } else {
        return this.state.albums.map(album => (
            <AButtonAlbum
              to={`/album/${album.id}`}
              key={album.id}
              title={album.title}
            />
          )
        )
      }
    }

    return (
      <div className="p-home t-page">
        {content()}
      </div>
    )
  }
}

export default PHome
