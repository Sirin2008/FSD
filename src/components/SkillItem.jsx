
function SkillItem(props) {
  return (
    <li className="skill-item">
      <span>{props.skill.name}</span>
      <span className="skill-level">
        {props.skill.level}
      </span>
    </li>
  );
}

export default SkillItem;
