import PressReleaseCard from "./PressReleaseCard.";

const PressReleaseList = ({ pressReleases }) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {pressReleases.map((release) => (
        <PressReleaseCard key={release.id} release={release} />
      ))}
    </div>
  );
};

export default PressReleaseList;
