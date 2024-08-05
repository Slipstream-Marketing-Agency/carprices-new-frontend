import PressReleaseCard from "./PressReleaseCard.";


const PressReleaseList = ({ pressReleases }) => {

    console.log(pressReleases,"pressReleases");
  return (
    <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8">
      {pressReleases.map((release) => (
        <PressReleaseCard key={release.id} release={release} />
      ))}
    </div>
  );
};

export default PressReleaseList;
