-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 21-Maio-2024 às 04:31
-- Versão do servidor: 5.7.17
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cosmetico`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `fornecedor`
--

CREATE TABLE `fornecedor` (
  `codigo` int(5) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `cnpj` int(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefone` varchar(50) NOT NULL,
  `endereco` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `produto`
--

CREATE TABLE `produto` (
  `codigo` int(5) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `descricao` varchar(50) NOT NULL,
  `valor` float(8,2) NOT NULL,
  `quantidade` int(5) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `foto` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `produto_fornecedor`
--

CREATE TABLE `produto_fornecedor` (
  `codigo` int(5) NOT NULL,
  `codproduto` int(5) NOT NULL,
  `codfornecedor` int(5) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `produto_fornecido`
--

CREATE TABLE `produto_fornecido` (
  `codigo` int(5) NOT NULL,
  `codproduto` int(5) NOT NULL,
  `quantidade` int(5) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `codigo` int(5) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `senha` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `venda`
--

CREATE TABLE `venda` (
  `codigo` int(5) NOT NULL,
  `codproduto` int(5) NOT NULL,
  `codusuario` int(5) NOT NULL,
  `quantidade` int(5) NOT NULL,
  `valor` float(8,2) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `fornecedor`
--
ALTER TABLE `fornecedor`
  ADD PRIMARY KEY (`codigo`);

--
-- Indexes for table `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`codigo`);

--
-- Indexes for table `produto_fornecedor`
--
ALTER TABLE `produto_fornecedor`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `codproduto` (`codproduto`),
  ADD KEY `codfornecedor` (`codfornecedor`);

--
-- Indexes for table `produto_fornecido`
--
ALTER TABLE `produto_fornecido`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `codproduto` (`codproduto`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`codigo`);

--
-- Indexes for table `venda`
--
ALTER TABLE `venda`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `codproduto` (`codproduto`),
  ADD KEY `codusuario` (`codusuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
