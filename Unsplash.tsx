import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Image,
  VStack,
  HStack,
  SimpleGrid,
  useBreakpointValue,
} from '@chakra-ui/react';
import React, { createElement, useEffect, useState } from 'react';
import { sampleUnsplashImages } from './images';

const OpenButton = ({
  url,
  count,
  setCount,
  color,
}: {
  url: string;
  count: number;
  setCount: (value: number) => void;
  color: string;
}) => {
  const onClick = () => {
    setCount(count + 1);
    window.open(`${url}&tc=${count + 1}`, '_blank');
  };

  useEffect(() => {
    console.log('OpenButton: url changed', url);
  }, [url]);

  return (
    <InputGroup size="lg">
      <Input backgroundColor={`${color}.50`} value={url} readOnly />
      <RightButton caption="OPEN" onClick={onClick} color="blue"></RightButton>
    </InputGroup>
  );
};

const RightButton = ({
  onClick,
  color,
  caption,
}: {
  color: string;
  caption: string;
  onClick: () => void;
}) => {
  return (
    <InputRightElement width="4.5rem">
      <Button
        size="md"
        onClick={onClick}
        backgroundColor={`${color}.500`}
        color={'white'}
      >
        {caption}
      </Button>
    </InputRightElement>
  );
};

const generate = (width = '640', height = '480', topic = 'hiking') => {
  return `https://source.unsplash.com/random/${width}x${height}/?${topic}`;
};

const generatePic = (
  width = '640',
  height = '480',
  name = 'photo-1600798065533-aea283409f83'
) => {
  return `https://images.unsplash.com/${name}?fit=crop&w=${width}&h=${height}&crop=entropy&fm=jpg`;
};

/**
 *
 * https://images.unsplash.com/photo-1600798065533-aea283409f83
 * ?crop=entropy
 * &cs=tinysrgb
 * &fit=crop
 * &fm=jpg
 * &w=800
 * &h=600
 * &ixid=MnwxfDB8MXxyYW5kb218MHx8YmljeWNsaW5nfHx8fHx8MTY0MTI4MzQ2Mg
 * &ixlib=rb-1.2.1
 * &q=80
 * &utm_campaign=api-credit
 * &utm_medium=referral
 * &utm_source=unsplash_source
 *
 */

// https://images.unsplash.com/photo-1600798065533-aea283409f83?fit=crop&w=800&h=600
// https://images.unsplash.com/photo-1600798065533-aea283409f83?fit=crop&w=800&h=600&crop=entropy&fm=jpg

type ImageInfo = {
  id: number;
  width: string;
  height: string;
  name: string;
  title: string;
  url: string;
  rounded: string;
};

export default function Unslpash() {
  const [width, setWidth] = useState('640');
  const [height, setHeight] = useState('480');
  const [topic, setTopic] = useState('hiking');
  const [url, setUrl] = useState(generate());
  const [pic, setPic] = useState('photo-1600798065533-aea283409f83');
  const [picUrl, setPicUrl] = useState(generatePic());
  const [rounded, setRounded] = useState('none');
  const [count, setCount] = useState(0);
  const [images, setImages] = useState<ImageInfo[]>(sampleUnsplashImages);
  const [maxId, setMaxId] = useState(
    sampleUnsplashImages.reduce(
      (prev, curr) => (prev > curr.id ? prev : curr.id),
      0
    )
  );

  useEffect(() => {
    console.log('CHANGED', { width, height, topic, pic });

    setUrl(generate(width, height, topic));
    setPicUrl(generatePic(width, height, pic));
  }, [width, height, topic, pic]);

  const addImage = () => {
    setMaxId(maxId + 1);

    const newImages = [
      {
        id: maxId,
        width,
        height,
        name: pic,
        rounded,
        title: pic,
        url: picUrl,
      },
      ...images,
    ];

    setImages(newImages);

    console.log(JSON.stringify(newImages, null, 4));
  };

  const removeImage = (id: number) => {
    const newImages = images.filter((image) => image.id !== id);

    setImages(newImages);
  };

  return (
    <HStack px={4}>
      <VStack
        w={'40%'}
        mx={'auto'}
        gap={2}
        p={{ base: 4, md: 8 }}
        backgroundColor={'gray.50'}
        maxHeight={'100vh'}
        overflowY={'auto'}
        alignSelf={'flex-start'}
      >
        <SimpleGrid columns={2} gap={2}>
          <Input
            backgroundColor={'white'}
            placeholder="Width in pixels"
            size="lg"
            typeof="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
          <Input
            backgroundColor={'white'}
            placeholder="Height in pixels"
            size="lg"
            typeof="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <Input
            backgroundColor={'white'}
            placeholder="Topic, like... mountains, nature, etc."
            size="lg"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <Input
            backgroundColor={'white'}
            placeholder="How rounded... none, xs, sm, md, lg, xl, full"
            size="lg"
            value={rounded}
            onChange={(e) => setRounded(e.target.value)}
          />
        </SimpleGrid>
        <OpenButton
          url={url}
          count={count}
          setCount={setCount}
          color="green"
        ></OpenButton>
        <InputGroup size="lg">
          <Input
            backgroundColor={'white'}
            placeholder="Topic, like... mountains, nature, etc."
            size="lg"
            value={pic}
            onChange={(e) => {
              const value = e.target.value
                .replace(/^.*\//g, '')
                .replace(/\?.*$/g, '');
              setPic(value);
            }}
          />

          <RightButton
            caption="ADD"
            onClick={addImage}
            color="green"
          ></RightButton>
        </InputGroup>
        <OpenButton
          url={picUrl}
          count={count}
          setCount={setCount}
          color="yellow"
        ></OpenButton>
        <Box>
          <Image src={picUrl} alt="Preview" rounded={rounded} />
        </Box>
      </VStack>
      <VStack
        w={'40%'}
        mx={'auto'}
        gap={2}
        rounded={'md'}
        backgroundColor={'gray.50'}
        maxHeight={'100vh'}
        overflowY={'scroll'}
        alignSelf={'flex-start'}
      >
        {images.map((image) => (
          <VStack key={image.name} gap={2}>
            <Image src={image.url} alt="Preview" rounded={image.rounded} />
            <HStack gap={4}>
              <Button
                onClick={() => setPic(image.name)}
                backgroundColor={'blue.300'}
                color={'white'}
              >
                SELECT
              </Button>
              <Button
                onClick={() => removeImage(image.id)}
                backgroundColor={'red.300'}
                color={'white'}
              >
                REMOVE
              </Button>
            </HStack>
          </VStack>
        ))}
      </VStack>
    </HStack>
  );
}
