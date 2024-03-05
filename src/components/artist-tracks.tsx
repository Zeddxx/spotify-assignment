import { useGetArtistTopTracksQuery } from "../redux/apis/spotify-api"

const ArtistTracks = ({ artistId, token } : { artistId: string, token: string }) => {
  const { data, isLoading } = useGetArtistTopTracksQuery({
    artistId: artistId,
    token: token
  })

  if(isLoading) return <p>Loading...</p>
  return (
    <div className="px-3 my-7">
      <h2 className="text-2xl font-semibold">Best Artist tracks</h2>
      <div className="grid grid-cols-5 gap-5 my-4">
        {data?.tracks.map((item) => (
            <div className="" key={item.id}>
                <div className="rounded-lg overflow-hidden">
                    <img src={item.album.images[0].url} alt={item.name} />
                </div>
                <h3 className="text-base truncate mt-3">{item.name}</h3>
                <p className="text-sm text-stone-400 capitalize">{item.type}</p>
            </div>
        ))}
    </div>
    </div>
  )
}
export default ArtistTracks