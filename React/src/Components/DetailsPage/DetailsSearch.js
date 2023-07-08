import { useForm } from "react-hook-form";
import styled, { keyframes } from "styled-components";

function DetailsSearch({ Exit, Search }) {
  const { register, handleSubmit } = useForm();

  const FadeIn = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }`;

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
    padding-left: 2rem;
    padding-right: 1rem;
    font-size: 1.5rem;
    background-color: white;
    position: relative;

    display: flex;
    align-items: center;
    justify-content: space-around;
  `;

  const SearchButton = styled.button`
    background: none;
    border: none;
    font-size: 2rem;
    &:hover {
      color: rgba(0, 0, 0, 0.1);
    }
  `;

  const SearchInput = styled.input`
    height: 3rem;
    width: 20rem;
    font-size: 1.5rem;
    font-weight: 800;
    border: none;
  `;

  const ExitButton = styled.button`
    position: absolute;

    height: 3rem;
    width: 3rem;
    background: none;
    border: none;
    font-size: 2rem;
    background-color: white;
    border-radius: 50%;
    top: 10rem;

    &:hover {
      color: rgba(0, 0, 0, 0.1);
    }
  `;

  const DetailsSelection = styled.select`
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 239rem;
    padding-left: 0.5rem;
    font-size: 0.8rem;
    height: 1.3rem;
  `;

  const SearchForm = styled.form`
    display: flex;
    align-items: center;
    justify-content: space-around;
  `;

  const onVaild = async ({ name, endangered }) => {
    Search(name, endangered);
  };

  const onInValid = () => {
    console.log("에바");
  };

  return (
    <SearchDiv>
      <SearchInputDiv>
        <SearchForm onSubmit={handleSubmit(onVaild, onInValid)}>
          <div>
            <SearchInput
              placeholder="동물명 / 빈칸입력시 전체검색"
              {...register("name")}
            />

            <DetailsSelection {...register("endangered")}>
              <option value="">멸종위기등급</option>
              <option value="">전체검색</option>
              <option value="1">멸종위기 야생생물 Ⅰ급</option>
              <option value="2">멸종위기 야생생물 Ⅱ급</option>
            </DetailsSelection>
          </div>
          <SearchButton className="material-symbols-outlined" type="submit">
            search
          </SearchButton>
        </SearchForm>
        <ExitButton className="material-symbols-outlined" onClick={Exit}>
          close
        </ExitButton>
      </SearchInputDiv>
    </SearchDiv>
  );
}

export default DetailsSearch;
