type RepositoryItemProps = {
  repository: {
    name: string;
    description: string;
    html_url: string;
  }
}

export const RepositoryItem: React.FC<RepositoryItemProps> = ({ repository }) => {
  
  return (
    <li >
      <p>{repository.name}</p>
      <a href={repository.html_url}>{repository.name}</a>
    </li>
  )
};