import { useQuery, gql } from "@apollo/client";
import Head from "next/head";
import { useTranslation } from "../../lib/getTranslation";
import ErrorMessage from "../ErrorMessage";
import Loader from "../Loader";
import alertRedirect from "../../lib/alertRedirect";
import formatSize from "../../lib/formatSize";
import { ItemStyles } from "../styles/SingleItemStyles";
import Link from "next/link";
import { SmallButtonWhite } from "../styles/Button";
import { plotsType, plotsTypeOfImplant } from "../../config";

export const SINGLE_CULTIVATION_PLOT = gql`
  query SINGLE_CULTIVATION_PLOT($id: ID!) {
    allCultivationPlots(where: { id: $id }) {
      id
      name
      description
      width
      height
      type
      typeOfImplant
      cultivationArea {
        id
        name
        user {
          id
        }
      }
    }
  }
`;

export default function SingleCultivationPlot({ id, user }) {
  const { t } = useTranslation();
  const { data, loading, error } = useQuery(SINGLE_CULTIVATION_PLOT, {
    variables: { id },
  });
  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;
  const [CultivationPlot] = data.allCultivationPlots;
  if (
    alertRedirect(
      !!CultivationPlot && CultivationPlot.cultivationArea.user.id === user.id,
      t.noCultivationPlotsFound,
      `/${t.cultivationAreasLink}`
    )
  )
    return null;
  // Get type label for transltion
  const { label: translationType } = plotsType.find(
    (plotType) => plotType.value === CultivationPlot.type
  );
  const { label: translationTypeOfImplant } = plotsTypeOfImplant.find(
    (plotTypeOfImplant) =>
      plotTypeOfImplant.value === CultivationPlot.typeOfImplant
  );
  return (
    <ItemStyles>
      <Head>
        <title>Hortus | {CultivationPlot.name}</title>
      </Head>
      <div className="details">
        <h2>{CultivationPlot.name}</h2>
        <p>
          {CultivationPlot.description}
          <br></br>
          {t.dimensions}: {formatSize(CultivationPlot.width, "m")}x
          {formatSize(CultivationPlot.height, "m", true, true)}
          <br></br>
          {t.type}: {t[translationType]}
          <br></br>
          {t.typeOfImplant}: {t[translationTypeOfImplant]}
          <br></br>
          {t.cultivationArea}:
        </p>
        <SmallButtonWhite>
          <Link
            href={`/${t.cultivationPlotsLink}?${t.cultivationAreaId}=${CultivationPlot.cultivationArea.id}`}
          >
            {CultivationPlot.cultivationArea.name}
          </Link>
        </SmallButtonWhite>
      </div>
    </ItemStyles>
  );
}
