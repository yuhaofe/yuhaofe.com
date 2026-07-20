import HomeAbout from '@/components/home-about'
import HomeBlog from '@/components/home-blog'
import HomeHero from '@/components/home-hero'
import HomeProjects from '@/components/home-projects'
import Marquee from '@/components/marquee'
import { getLocale, getTexts } from '@/lib/i18n'
import { getAllPosts } from '@/lib/notion'
import { getAllProjects } from '@/lib/projects'

export default async function Home() {
  const texts = getTexts()
  const allProjects = await getAllProjects()
  const projects = allProjects.slice(0, 4)
  const posts = await getAllPosts()

  const specs = [
    texts.specRole1,
    texts.specRole2,
    texts.specProjects.replace('{count}', String(allProjects.length)),
    texts.specPosts.replace('{count}', String(posts.length)),
  ]

  return (
    <>
      <HomeHero
        kicker={texts.heroKicker}
        line1a={texts.heroLine1a}
        line1b={texts.heroLine1b}
        line2={texts.heroLine2}
        outline={texts.heroOutline}
        specs={specs}
        scrollCue={texts.scrollCue}
        gradientFirst={getLocale() === 'zh-CN'}
      />
      <Marquee phrase={texts.marqueePhrase} />
      <HomeProjects
        label={texts.projectsSection}
        title={texts.projects}
        projects={projects}
        moreLabel={texts.viewAllProjects}
      />
      <HomeBlog
        label={texts.blogSection}
        title={texts.blog}
        posts={posts.slice(0, 5)}
        moreLabel={texts.viewAllPosts}
      />
      <Marquee phrase={texts.marqueePhrase} reverse />
      <HomeAbout
        label={texts.aboutSection}
        title={texts.about}
        aboutMeHtml={texts.aboutMe}
        roles={[texts.specRole1, texts.specRole2]}
        stats={[
          { label: texts.projects, value: String(allProjects.length).padStart(2, '0') },
          { label: texts.blog, value: String(posts.length).padStart(2, '0') },
        ]}
        moreLabel={texts.viewMore}
      />
    </>
  )
}
