export default function Page({ params }: any) {
    return (
        <div>
            <p>Profile</p>
            <p>{params.id}</p>
        </div>
    );
}