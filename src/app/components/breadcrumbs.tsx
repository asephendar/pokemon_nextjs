import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';

type Breadcrumb = {
  label: string;
  href?: string;
};

type Props = {
  items: Breadcrumb[];
  separator?: React.ReactNode;
};

export default function BasicBreadcrumbs({ items, separator = '›' }: Props) {
  return (
    <Breadcrumbs aria-label="breadcrumb" separator={separator}>
      {items.map((item, index) => (
        item.href ? (
          <Link key={index} href={item.href} legacyBehavior passHref>
            <Typography color="inherit" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
              {item.label}
            </Typography>
          </Link>
        ) : (
          <Typography key={index} color="text.primary">
            {item.label}
          </Typography>
        )
      ))}
    </Breadcrumbs>
  );
}
