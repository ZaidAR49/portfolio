import data from './data.json';
import { getIconForTechnology } from '../helpers/icon-mapper';
import parse from "html-react-parser";

export const userInfo = {
  name: data.user.name,
  jobTitle: data.user.job_title,
  email: data.user.email,
  descHero: parse(data.user.hero_description),
  titleAbout: data.user.about_title,
  github: data.user.github_url,
  linkedin: data.user.linkedin_url,
  picture: data.user.picture_url,
  descAbout: parse(data.user.about_description),
  resuma: data.user.resume_url,
  descCapabilities: parse(data.user.capabilities_description),
};

export const experience = data.experiences.map((exp) => ({
  peroid: exp.period,
  role: exp.role,
  companey: exp.company,
  desc: exp.description
}));

export const skillsData = {
  main: data.skills.main.map((skill) => ({
    icon: getIconForTechnology(skill.name),
    name: skill.name
  })),
  Secondary: data.skills.secondary.map((skill) => ({
    icon: getIconForTechnology(skill.name),
    name: skill.name
  }))
};

export const projects = data.projects.map((project) => ({
    state: project.state,
    title: project.title,
    description: parse(project.description),
    image: project.images,
    role: project.role,
    github: project.github_url,
    year: String(project.year),
    tech: project.technologies,
    client: project.client,
    order: project.sort_order
}));