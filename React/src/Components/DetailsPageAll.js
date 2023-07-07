import { useState } from "react";
import styled, { keyframes } from "styled-components";

const API = [
  {
    이름: "늑대",
    분류: "포유류",
    학명: "Canis lupus coreanus",
    개요: "식육목 개과에 속하는 포유류이다. 꼬리를 항상 밑으로 늘어뜨리고 있는 점이 개와 다르다. 다리는 길고 굵다. 코는 넓은 머리에 비하면 길고 뾰족하게 보이며 이마도 넓고 다소 경사졌다. 눈은 비스듬히 붙어 있고 귀는 항상 빳빳이 일어서 있으며 밑으로 늘어지지 않는다. 서식하고 있는 지방의 기후, 풍토에 따라 털의 밀도, 색채에 있어서 큰 차이가 나타난다. 깊은 산림보다는 개활지를 선호한다. 1회에 5~10마리의 새끼를 낳는다. 우리나라 북부 및 중부에 분포한 기록이 있으나 멸종한 것으로 여겨진다. 중국과 몽골에 분포한다",
    지정관리: "멸종위기 야생생물 Ⅰ급",
    path: "/animals/Canis lupus coreanus.jpeg",
  },
  {
    이름: "대륙사슴",
    분류: "포유류",
    학명: "Cervus nippon hortulorum",
    개요: "우제목 사슴과에 속하는 포유류이다. 머리와 몸통의 길이는 90~190cm이다. 우리나라 사슴과 동물 중에서 대형이며, 암수 간에 크기 차이가 뚜렷해 수컷의 몸이 암컷보다 1.5배 정도 크다. 털의 색은 밤갈색에서부터 붉은 올리브색이고, 목 부분과 등 부위에 백색 반점이 많이 있다. 암수 모두 겨울에는 목에 갈기를 지닌다. 산림 지대에 살며 산림 지대에서 주로 서식하며 저지대부터 고산 지대까지 분포한다. 나뭇잎, 나무껍질, 이끼, 풀 등을 먹으며 무리 생활을 한다. 전국에 분포했으나 남한에서는 1940년대 이후 절멸한 것으로 간주된다. 현재는 전국 여러 지역에서 사육되고 있으며, 제주도 한라산 등지에는 인위적으로 도입되어 서식하고 있다. 세계적으로는 일본, 중국, 러시아에 분포한다.",
    지정관리: "멸종위기 야생생물 Ⅰ급",
    path: "/animals/Cervus nippon hortulorum.jpeg",
  },
  {
    이름: "무산쇠족제비",
    분류: "포유류",
    학명: "Mustela nivalis Linnaeus, 1766",
    개요: "식육목 족제비과에 속하는 포유류이다. 몸길이는 16cm, 꼬리 길이는 4cm 정도로 식육류 중에서 가장 작다. 머리에서 꼬리 기부까지 굵기가 같으나 배만 조금 가늘다. 다리와 꼬리가 짧다. 체색은 여름에는 윗면은 적갈색이고, 뒷다리 안쪽의 몸 아랫면은 흰색이다. 겨울에는 북방족제비와 같이 갈색 털이 순백색으로 바뀐다. 밀림이나 초원 지대에 서식하나 인가 근처에도 나타난다. 작은 설치류와 개구리, 도마뱀, 뱀, 곤충, 게 등을 잡아먹는다. 상당히 큰 야생조류도 습격한다. 1마리가 1년에 설치류 2천~3천 마리를 잡아먹는다. 동작이 민첩하여 점프하면서 잘 달리고 점핑 폭은 20~30cm이다. 제주도와 울릉도를 제외한 전국에 서식하고 세계적으로는 러시아, 일본, 유럽, 중국, 미국, 캐나다에 분포한다.",
    지정관리: "멸종위기 야생생물 Ⅰ급",
    path: "/animals/Mustela nivalis Linnaeus.jpeg",
  },

  {
    이름: "물범",
    분류: "포유류",
    학명: "Phoca largha Pallas, 1811",
    개요: "식육목 물범과에 속하는 포유류이다. 바다표범과 중에서 가장 작은 동물로 성숙한 수컷의 최대 체장은 1.7m, 암컷은 1.6m이며 암수 체중은 82~130kg이다. 앞머리 부위가 둥글면서 높고 귓바퀴는 아주 작으며, 주둥이는 끝이 좁고 중앙에 골이 있으며, 목은 짧다. 앞다리는 앞으로, 뒷다리는 뒤로 향해 있어 방향을 바꿀 때 불편하다. 몸 색깔은 일반적으로 옅은 은회색이며, 일정한 크기의 타원형 점들이 산재한다. 겨울부터 초여름 사이에는 떠다니는 얼음이 있는 수역에, 늦은 여름부터 가을에는 연안과 강 하구에 살며, 새끼 1마리와 부모가 얼음 사이에서 생활하면서 명태, 청어, 대형 플랑크톤 등을 잡아먹는다. 번식기가 되면 수컷이 암컷을 여러 마리 거느리는데, 1월 하순에 떠다니는 얼음 위에서 출산한다. 전국 해역에 출현하고 특히 백령도 근해에서 잘 나타난다. 세계적으로는 북태평양, 러시아 캄차카, 일본 홋카이도, 미국 캘리포니아 알류샨 해역에 분포한다.",
    지정관리: "멸종위기 야생생물 Ⅰ급",
    path: "/animals/Phoca largha Pallas.jpeg",
  },
  {
    이름: "노랑부리백로",
    분류: "조류",
    학명: "Egretta eulophotes (Swinhoe, 1860)",
    개요: "황새목 백로과에 속하는 드문 여름철새이다[멸종위기 야생생물 I급]. 몸길이 약 68cm. 암수의 형태가 유사하다. 몸은 전체가 흰색이고, 부리와 발은 노란색이다. 번식기에는 다리는 검은색을 띠고 머리에 긴 장식깃들이 생기며, 목과 등에도 장식깃이 발달한다. 겨울에는 장식깃이 없어지고, 부리는 흑갈색, 다리는 녹황색을 띤다. 해안의 만, 하구, 간석지, 갯벌, 논 등에서 서식하는 드문 여름철새이다. 먹이는 주로 갯벌이나 바다가 가까운 습지에서 물고기와 게, 새우 등의 갑각류, 갯지렁이 등을 잡아먹는다. 간조 시 드러나는 갯벌이나 염전, 농경지, 저수지 등에서도 먹이 활동하며, 강화 남단 갯벌, 한강 하구, 안산 도서지역, 안면도, 천수만 등에서 여름철 먹이 활동하는 모습이 종종 관찰된다. 세계자연보호연맹에서 취약종(VU)으로 분류한 국제보호조로 전 세계 생존집단 중 대부분이 서해안의 무인도서 지역에서 번식하고 있다.",
    지정관리: "멸종위기 야생생물 Ⅰ급",
    path: "/animals/Egretta eulophotes.jpeg",
  },

  {
    이름: "느시",
    분류: "조류",
    학명: "Otis tarda Linnaeus, 1758",
    개요: "느시는 「멸종위기 야생생물 Ⅱ급」의 느시과 조류로 매우 드문 겨울철새이다. 몸은 전체적으로 황갈색이고 가슴에 적갈색의 띠가 있다. 긴 목과 다리, 통통하고 큰 체형으로 쉽게 구별된다. 평야, 구릉지, 초원 등에 서식하며, 농경지에서도 서식한다. 5~6월 산란하며, 일부다처제로 생활한다. 과거에는 흔한 겨울철새였으나 불법사냥, 농약사용 등 잇단 개발로 위협받고 있다. 현재 한국적색목록에 멸종위기범주로 평가되어 있다. ",
    지정관리: "멸종위기 야생생물 Ⅰ급",
    path: "/animals/Otis tarda Linnaeus.jpeg",
  },
];

function DetailsPage() {
  const [Num, SetNum] = useState(0);
  const [Visible, SetVisible] = useState(false);
  const [ani, setAni] = useState(true);

  function getRandomNumber() {
    return Math.random() * (3.8 - 3.2) + 3.2;
  }
  const AnimeLine = keyframes`
  0%{
    top: 50rem;
  }

  100%{
    top: 0rem;
  }
`;

  const AnimeName = keyframes`
0%{
  left: -15rem;
}
50%{
  left: -15rem;
}
90%{
  left: 0;
}
`;

  const AnimeHak = keyframes`
0%{
  left: -20rem;
}
50%{
  left: -20rem;
}
90%{
  left: 0;
}
`;

  const AnimeContent = keyframes`
0%{
  left: -35rem;
}
50%{
  left: -35rem;
}
90%{
  left: 0;
}
`;

  const AnimeImg = keyframes`
0%{
  right: -50rem;
}

50%{
  right: -50rem;
}
100%{
  right: 0;
}
`;

  const FadeIn = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }`;

  const Imgs = styled.img`
    height: 33rem;
    width: 44rem;
    position: relative;

    animation: ${ani ? AnimeImg : ""} 3.6s ease-in-out;
  `;

  const MainDIv = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-around;
  `;

  const ImgsDiv = styled.div`
    height: 33rem;
    width: 44rem;
    overflow: hidden;
  `;

  const ContentDiv = styled.div`
    height: 33rem;
    width: 33rem;
    overflow: hidden;
  `;
  const MovingLine = styled.div`
    border: 1px solid black;
    background-color: black;
    height: 33rem;
    width: 0.05rem;
    position: relative;
    animation: ${ani ? AnimeLine : ""} 1.3s ease-in-out;
  `;
  const AnimalsName = styled.h2`
    position: relative;
    animation: ${ani ? AnimeName : ""} 2.6s ease-in-out;
  `;

  const AnimalsEnName = styled.h3`
    margin-top: 1rem;
    margin-bottom: 2rem;
    position: relative;
    animation: ${ani ? AnimeHak : ""} 2.6s ease-in-out;
  `;
  const AnimalsContent = styled.h5`
    margin: 0;
    margin-top: 0.8rem;
    position: relative;
    animation: ${ani ? AnimeContent : ``} ${function (props) {
        return props.delay + "s";
      }} ease-in-out;
  `;

  const ButtonDiv = styled.div`
    position: fixed;
    bottom: 10%;
    left: 45%;
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;

  const Return = styled.button`
    width: 1rem;
    height: 1rem;
  `;

  const Next = styled.button`
    width: 1rem;
    height: 1rem;
  `;

  const MainButton = styled.button`
    width: 1rem;
    height: 1rem;
  `;

  const Cut = (Content) => {
    const String = Content.split(".");
    return String;
  };

  const NextEvent = () => {
    setAni(true);
    if (Num + 1 == API.length) {
      return alert("마지막입니다");
    } else {
      SetNum(Num + 1);
    }
  };
  const ReturnEvent = () => {
    setAni(true);
    if (Num > 0) {
      SetNum(Num - 1);
    } else {
      return alert("처음입니다");
    }
  };
  const MainButtonEvent = () => {
    setAni(false);
    SetVisible(!Visible);
  };

  const ExitButtonEvent = () => {
    SetVisible(!Visible);
  };

  const SearchDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: rgba(0, 0, 0, 0.7);
    position: absolute;
    z-index: 100;
    animation: ${FadeIn} 0.4s ease-in-out;
  `;

  const SearchInputDiv = styled.div`
    width: 25rem;
    height: 6rem;
    border-radius: 100rem;
    padding-left: 1rem;
    padding-right: 2rem;
    font-size: 1.5rem;
    background-color: white;
    position: relative;

    display: flex;
    align-items: center;
    justify-content: space-around;
  `;

  const SearchButton = styled.button``;

  const SearchInput = styled.input`
    height: 3rem;
    width: 20rem;
    font-size: 1.5rem;
    font-weight: 800;
    border: none;
  `;

  const ExitButton = styled.button`
    position: absolute;
    top: 10rem;
  `;

  return (
    <>
      {Visible && (
        <SearchDiv>
          <SearchInputDiv>
            <SearchInput />
            <SearchButton className="material-symbols-outlined">
              search
            </SearchButton>
            <ExitButton
              className="material-symbols-outlined"
              onClick={ExitButtonEvent}
            >
              close
            </ExitButton>
          </SearchInputDiv>
        </SearchDiv>
      )}
      <MainDIv>
        <ImgsDiv>
          <Imgs src={API[Num].path} />
        </ImgsDiv>
        <MovingLine />
        <ContentDiv>
          <AnimalsName>{API[Num].이름}</AnimalsName>
          <AnimalsEnName>
            {API[Num].학명}
            <br />
            {API[Num].지정관리}
          </AnimalsEnName>

          {Cut(API[Num].개요).map((result, index) => {
            return (
              <AnimalsContent key={index} delay={getRandomNumber()}>
                {result}
              </AnimalsContent>
            );
          })}
        </ContentDiv>
      </MainDIv>
      <ButtonDiv>
        <Return onClick={ReturnEvent} />
        <MainButton onClick={MainButtonEvent} />
        <Next onClick={NextEvent} />
      </ButtonDiv>
    </>
  );
}

export default DetailsPage;
