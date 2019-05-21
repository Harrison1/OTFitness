// import * as React from 'react'
// import styled from '../utils/styled-components'

// interface UserCardProps {
//   firstName?: string
//   lastName?: string
//   gender?: string
//   src?: string
//   uuid?: string
//   onClick?: (id:string) => void
// }

// const Card = styled(`button`)<UserCardProps>`
//   border-radius: 999rem;
//   cursor: pointer;
//   min-width: 250px;
//   width: 100%;
//   padding: 3px;
//   background-image: ${props => ((props.gender === 'female') ? 'linear-gradient(to right,#db35f7,#7372d6)' : 'linear-gradient(to right,#c209ff,#ff505a);')};
//   border: none;
//   transition: box-shadow 0.25s ease;
//   &:hover {
//     box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.3);
//   }
// `

// const StyleDiv = styled.div`
//   border-radius: 999rem;
// `

// const InnerCard = styled.div`
//   background: #fff;
//   border-radius: 999rem;
//   display: grid;
//   grid-template: "a b" "a c";
// `

// const UserImage = styled.img`
//   grid-area: a;
//   border-radius: 50%;
// `

// const Name = styled.span`
//   grid-area: b;
//   display: block;
//   font-size: 1.8rem;
//   justify-self: end;
//   align-self: center;
//   padding-right: 20px;
// `

// const Gender = styled.span`
//   grid-area: c;
//   color: #868686;
//   display: block;
//   font-size: 1.2rem;
//   justify-self: end;
//   align-self: center;
//   padding-right: 20px;
// `

// const capitizeFirstLetter = str => {
//   if(str) {
//     return str.charAt(0).toUpperCase() + str.slice(1);
//   } else {
//     return ''
//   }
// }

// export const UserCard = (props: UserCardProps) => {
//   const addToList = () => {
//     props.onClick(props.uuid)
//   }
//   return (
//     <Card 
//       gender={props.gender}
//       onClick={addToList}
//     >
//       <StyleDiv>
//         <InnerCard>
//           <UserImage
//             src={props.src}
//             alt={`${props.firstName} ${props.lastName}`}
//           />
//           <Name>{capitizeFirstLetter(props.firstName)} {capitizeFirstLetter(props.lastName)}</Name>
//           <Gender>{props.gender}</Gender>
//         </InnerCard>
//       </StyleDiv>
//     </Card>
//   )
// }
