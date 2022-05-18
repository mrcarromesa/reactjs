import { useEffect, useState } from 'react';
import { RepositoryItem } from "./RepositoryItem";

import '../styles/repositories.scss';


type Repository = {
    name: string;
    description: string;
    html_url: string;
}

export const RepositoryList = () => {

  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    
    const loadRepositories = async () => {
      const response = await fetch('https://api.github.com/orgs/rocketseat/repos');
      const repositoriesData = await response.json();
      setRepositories(repositoriesData);
    };

    loadRepositories();
  }, []);

  return (
    <section className="repository-list">
      <h1>Lista1 de repositório</h1>
      <ul>
        {repositories.map(repository => (
          <RepositoryItem key={repository.name} repository={repository} />
        ))}
      </ul>
    </section>
  );
}