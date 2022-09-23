import React from 'react'
import { Alert, Box, Button, Center, Flex, Input, Text, Tooltip, useColorMode, useToast } from '@chakra-ui/react'
import style from './Home.module.css'
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { SunIcon, MoonIcon, CloseIcon } from '@chakra-ui/icons'
import { useState } from 'react'
function HomePage() {

    const toast = useToast();
    const { colorMode, toggleColorMode } = useColorMode();

    const [origalUrl, setOriginalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [newURL, setNewURL] = useState('')


    const [modal, setModal] = useState(false);
    const [err1, setErr1] = useState(false);


    const handelOrignal = (e) => {
        setOriginalUrl(e.target.value)
    }

    const handelShort = (e) => {
        setShortUrl(e.target.value)
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(origalUrl, shortUrl)
        const payload = {
            originalURL: origalUrl,
            shortURL: shortUrl
        }


        await fetch("https://rushi-tiny-uri.herokuapp.com/", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                setNewURL(res.message);
                if (res.status) {
                    setErr1(true)

                }
                else {
                    setErr1(false)
                }

            })
            .catch((err) => {
                console.log(err)
            })


        setModal(true)






    }

    const handleClose = () => {
        setModal(false);
        setErr1(false)
    }
    return (
        <>
            <Flex justifyContent='space-between' bg='rgb(120, 28, 104)' w='100%' h='80px'>
                <Text pl='150px' color={colorMode === 'dark' ? 'black' : 'white'} fontSize='4xl' fontWeight='bold' pt='10px'>
                    Tiny URL
                </Text>
                <Button
                    onClick={toggleColorMode}
                    cursor='pointer'
                    mr='150px'
                    mt='10px'
                    w='50px'
                    h='50px'
                    bg={colorMode === 'dark' ? 'black' : 'white'}
                    fontWeight='600'
                    borderRadius='25px'
                    pl='19px'
                    fontSize='3xl'
                >
                    {colorMode === 'dark' ? <MoonIcon /> : <SunIcon />}
                </Button>


            </Flex>
            <Center color={colorMode === 'dark' ? 'white' : 'rgb(120, 28, 104)'} fontWeight='600' fontSize='6xl'>
                URL Shorterner

            </Center>


            {modal ?
                <Flex className={style.modalBorder} m='auto' w='50%' h='80px' bg={err1 ? "rgb(251,211,141)" : 'rgb(212,237,218)'}>
                    <CopyToClipboard text={newURL}

                    >
                        <Box color={colorMode === 'dark' ? 'black' : 'black'} onClick={() =>
                            toast({
                                title: 'Copied',
                                status: 'success',
                                duration: 500,
                                position: "top",
                                isClosable: true,
                            })} w='90%' cursor='pointer' p='20px'>
                            {newURL}
                        </Box>
                    </CopyToClipboard>


                    <Box w='10%' pl='30px' pt='20px' className={style.close} onClick={handleClose}>
                        <Tooltip hasArrow label='close' color='black' bg='rgb(170, 196, 255)'>

                            <CloseIcon />
                        </Tooltip>
                    </Box>

                </Flex> : null}

            <Box className={style.name} bg={colorMode === 'dark' ? 'white' : null} m='auto' mt='40px' w='50%' h='350px'>
                <form onSubmit={handleSubmit}>
                    <Box>

                        <Text color={colorMode === 'dark' ? 'black' : 'black'} pt='50px' className={style.lable}>Enter Your URL</Text>

                        <Input
                            color={colorMode === 'dark' ? 'black' : 'black'}
                            _placeholder={{ color: 'inherit' }}
                            isInvalid
                            errorBorderColor={colorMode === 'dark' ? 'rgb(177, 178, 255)' : "nono"}
                            className={style.input}
                            onChange={handelOrignal}
                            value={origalUrl}
                            w='500px'
                            variant='filled'
                            isRequired
                            placeholder='Origin URL' />
                    </Box>

                    <Box>
                        <Text color={colorMode === 'dark' ? 'black' : 'black'} pt='20px' className={style.lable}>Enter Custom URl Name</Text>

                        <Input
                            color={colorMode === 'dark' ? 'black' : 'black'}
                            _placeholder={{ color: 'inherit' }}
                            isInvalid
                            errorBorderColor={colorMode === 'dark' ? 'rgb(177, 178, 255)' : "nono"}
                            className={style.input}
                            onChange={handelShort}
                            value={shortUrl}
                            w='500px'
                            variant='filled'
                            isRequired
                            placeholder='Short URL' />
                    </Box>
                    <input className={style.btn} type='submit' value='Short URL' />
                </form>

            </Box>

        </>
    )
}

export default HomePage
