import React, { Children, isValidElement } from 'react';
import { motion } from 'framer-motion';
import { maskWordVariant, scrollViewport } from '../config/motion';

/**
 * SplitReveal
 * Renders a heading whose words rise out of a clipping mask, one after another.
 *
 * - Accepts plain strings and simple inline elements (e.g. <span className="text-accent">).
 *   Element wrappers are kept, so their styling (color, font, margins) still applies.
 * - The heading text exists once in the DOM: the animated word spans are the real text
 *   (no hidden duplicate), so screen readers and crawlers read the sentence once.
 * - `inView`: trigger on scroll by itself. Without it, the component inherits the
 *   "hidden"/"visible" state from a parent motion element (used by SectionHeader and Hero).
 */

function splitWords(text, keyPrefix) {
  return text.split(/(\s+)/).map((part, index) => {
    if (!part) return null;
    if (/^\s+$/.test(part)) return ' ';
    return (
      <span className="reveal-word" key={`${keyPrefix}-${index}`}>
        <motion.span className="reveal-word-inner" variants={maskWordVariant}>
          {part}
        </motion.span>
      </span>
    );
  });
}

function renderAnimated(children, keyPrefix = 'w') {
  return Children.toArray(children).map((child, index) => {
    const key = `${keyPrefix}-${index}`;
    if (typeof child === 'string' || typeof child === 'number') {
      return <React.Fragment key={key}>{splitWords(String(child), key)}</React.Fragment>;
    }
    if (isValidElement(child)) {
      // Fragments carry no styling: just animate their children in place
      if (child.type === React.Fragment) {
        return <React.Fragment key={key}>{renderAnimated(child.props.children, key)}</React.Fragment>;
      }
      // Keep the wrapper element (and its className/style), animate its words
      const { children: inner, ...props } = child.props;
      const Wrapper = child.type;
      return (
        <Wrapper key={key} {...props} aria-hidden="true">
          {renderAnimated(inner, key)}
        </Wrapper>
      );
    }
    return null;
  });
}

export default function SplitReveal({
  as = 'h2',
  className,
  children,
  motionEnabled = true,
  inView = false,
  stagger = 0.06,
  delay = 0,
  viewport = scrollViewport,
  ...rest
}) {
  const Tag = as;

  if (!motionEnabled) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[as] || motion.div;
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
  const trigger = inView ? { initial: 'hidden', whileInView: 'visible', viewport } : {};

  return (
    <MotionTag className={className} variants={containerVariants} {...trigger} {...rest}>
      {renderAnimated(children)}
    </MotionTag>
  );
}
