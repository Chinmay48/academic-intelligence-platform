package com.aip.academic_intelligence_platform.embedding.dto;

public record RetrivedChunk(String docuementName,String chunkText,Integer chunkOrder,Integer pageNumber,double similarity) {

}
