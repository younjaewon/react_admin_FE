import React from "react";
import "../../../css/modal.css";

const ModalComponent = (props) => {
  const { open, close, header, addModalColumn, updateModalCoulmn } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>{props.main}</main>
          <footer>
            {updateModalCoulmn && (
              <button className="close" onClick={updateModalCoulmn}>
                수정
              </button>
            )}
            {addModalColumn && (
              <button className="close" onClick={addModalColumn}>
                등록
              </button>
            )}
            <button className="close" onClick={close}>
              닫기
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default ModalComponent;
