import cstyles from '../../styles/Common.module.css'

export default function Post() {
    return (
        <>
            <article className={cstyles.section}>
                <h1>Celebrate The 2021 National Day!!! 🎉✨</h1>
                <p><time dateTime="2021-10-01 00:00">2021-10-01</time> by fHz</p>
                <img src="https://i.loli.net/2021/09/23/Cv3UPs8SBbFKrjq.jpg" alt="National Day Fireworks"/>
            </article>
        </>
    )
}