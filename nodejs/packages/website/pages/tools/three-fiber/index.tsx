/**
 *
 * ThreeFiber
 *
 */

 import React from 'react';
 import { styled } from '@mui/material/styles';
 
 import Head from 'next/head';
 import Link from 'next/link';
 import Grid from '@mui/material/Grid';
 import Paper from '@mui/material/Paper';
 import Typography from '@mui/material/Typography';
 
 import Layout from 'components/Layout';
 
 const PagePaper = styled(Paper)(({
   theme
 }) => ({
   padding: theme.spacing(3),
   margin: theme.spacing(3),
 }));
 const StyledTypography = styled(Typography)(({
   theme,
 }) => ({
   fontSize: '1.44rem',
   fontWeight: 400,
 }));
 
 interface Props {}
 
 function ThreeFiber(props: Props) {
 
   return (
     <Layout>
       <Head>
         <title>ThreeFiber</title>
         <meta name="description" content="Description of ThreeFiber" />
       </Head>
       <Grid container justifyContent="center">
         <Grid item md={11}>
           <Grid container>
             <Grid item md={4}>
               <PagePaper>
                 <Link href="/tools/three-fiber/cloud">
                   <a>
                     <StyledTypography>
                       Cloud
                     </StyledTypography>
                   </a>
                 </Link>
               </PagePaper>
               <PagePaper>
                 <Link href="/tools/three-fiber/bottles">
                   <a>
                     <StyledTypography>
                       Bottles
                     </StyledTypography>
                   </a>
                 </Link>
               </PagePaper>
               <PagePaper>
                 <Link href="/tools/three-fiber/lambo">
                   <a>
                     <StyledTypography>
                       Lambo
                     </StyledTypography>
                   </a>
                 </Link>
               </PagePaper>
             </Grid>
           </Grid>
         </Grid>
       </Grid>
     </Layout>
   );
 }
 
 export default ThreeFiber;
 