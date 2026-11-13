import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

export default function NotFoundPage() {
  return (
    <PageHero eyebrow="404" title="This page doesn't exist." intro="The link may be old or mistyped.">
      <Link to="/" className="btn btn-primary">
        <span>Go to the homepage</span>
      </Link>
    </PageHero>
  );
}
