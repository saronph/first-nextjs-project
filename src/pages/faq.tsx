import { AccordionDetails } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Accordion, AccordionSummary } from "@material-ui/core";
import { GetStaticProps } from "next";
import React from "react";
import { FaqModel } from "../../api/Faq";
import { openDB } from "../openDB";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
interface FaqProps {
  faq: FaqModel[];
}

export default function Faq({ faq }: FaqProps) {
  return (
    <div>
      {faq.map((f) => (
        <Accordion key={f.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{f.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{f.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const db = await openDB();
  const faq = await db.all("SELECT * FROM FAQ ORDER BY createDate DESC");
  return { props: { faq } };
};
