// import { useQuery, gql } from "@apollo/client";
// import { useTranslation } from "../../lib/getTranslation";
// import CultivationPlot from "./CultivationPlot";
// import ErrorMessage from "../ErrorMessage";
// import styled from "styled-components";
// import { perPage } from "../../config";
// import Link from "next/link";
// import Loader from "../Loader";
// import { useRouter } from "next/router";

// // TODO: Write correct query with other fields and related area
// export const ALL_CULTIVATION_PLOTS_QUERY = gql`
//   query ALL_CULTIVATION_PLOTS_QUERY($skip: Int = 0, $first: Int, $user: ID!) {
//     allCultivationPlots(
//       skip: $skip
//       first: $first
//       where: { user: { id: $user } }
//     ) {
//       id
//       name
//       description
//     }
//   }
// `;

// // TODO: Same for areas and plots
// const CultivationPlotsStyles = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   grid-gap: 60px;
//   margin-bottom: 10px;
// `;

// // TODO: Same for areas and plots
// const NoPlotsStyles = styled.div`
//   display: block;
//   color: var(--lightGreen);
//   text-align: center;
//   a {
//     width: auto;
//     background: var(--green);
//     border-radius: var(--borderRadius);
//     box-shadow: var(--bs);
//     color: white;
//     border: 0;
//     font-size: 1.5rem;
//     font-weight: 600;
//     font-family: "Gascogne Serial";
//     padding: 0.5rem 1.2rem;
//     margin: 10px 15px 5px 0;
//     transition: all 0.3s ease-in-out;
//     cursor: pointer;
//     &:hover {
//       background: var(--lightGreen);
//       text-decoration: none;
//       &:disabled {
//         background: var(--green);
//       }
//     }
//     @media (max-width: 700px) {
//       width: 100%;
//     }
//   }
// `;

// export default function CultivationPlots({ page, user }) {
//   const { t } = useTranslation();
//   const router = useRouter();
//   const { data, loading, error } = useQuery(ALL_CULTIVATION_PLOTS_QUERY, {
//     variables: {
//       skip: page * perPage - perPage,
//       first: perPage,
//       user: user.id,
//     },
//   });
//   if (loading) return <Loader />;
//   if (error) return <ErrorMessage error={error} />;
//   const allCultivationPlots = data.allCultivationAreas;
//   if (allCultivationPlots.length === 0 && page === 1)
//     return (
//       <NoPlotsStyles>
//         {/* TODO: translation */}
//         <h3>{t.noCultivationPlotsCreated}</h3>
//         <Link href={`/${t.createNewCultivationPlotLink}`}>
//           {t.createNewCultivationPlot}
//         </Link>
//       </NoPlotsStyles>
//     );
//   else if (allCultivationPlots.length === 0 && page > 1)
//     router.push({ pathname: `/${t.cultivationPlotsLink}` });
//   return (
//     <CultivationPlotsStyles>
//       {allCultivationPlots.map((cultivationPlot) => (
//         <CultivationPlot
//           key={cultivationPlot.id}
//           cultivationPlot={cultivationPlot}
//         />
//       ))}
//     </CultivationPlotsStyles>
//   );
// }
